"use client";

import { useRef, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { State } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "@/store/steperSlice";

interface CustomProps {
  onChange: (e: Array<number>) => void;
}

const YMap = ({ onChange }: CustomProps) => {
  const dispatch = useDispatch();

  const step = useSelector(({ steper }: State) =>
    steper?.steps?.find((step) => step.id === 3),
  );

  const VALUE = [step?.data?.lat || 0, step?.data?.long || 0];

  useEffect(() => {
    if (!(step?.data?.lat?.length > 0 && step?.data?.long?.length > 0)) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log({ latitude, longitude });
        dispatch(setLocation({ key: "lat", value: latitude }));
        dispatch(setLocation({ key: "long", value: longitude }));
      });
    }
  }, [dispatch, step?.data?.lat, step?.data?.long]);

  const mapRef: any = useRef();
  const placemarkRef: any = useRef();
  const ymaps: any = useRef(null);

  useEffect(() => {
    if (ymaps.current) {
      const bounds = ymaps.current.util.bounds.fromPoints([
        [48.024402067130715, 39.85466330972504],
        [46.780699672601415, 39.807971415195674],
      ]);
      mapRef.current.setBounds(bounds, { checkZoomRange: true });
    }
  }, [ymaps]);

  const getPlacemarkAddress = (coords: any, callback: any) => {
    ymaps.current.geocode(coords).then((res: any) => {
      const firstGeoObject = res.geoObjects.get(0);
      const newAddress = [
        firstGeoObject.getLocalities().length
          ? firstGeoObject.getLocalities()
          : firstGeoObject.getAdministrativeAreas(),
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
        firstGeoObject.getPremiseNumber(),
      ]
        .filter(Boolean)
        .join(", ");
      callback(newAddress);
    });
  };

  const handleMapClick = (event: any) => {
    const coords = event.get("coords");

    onChange(coords?.map((c: number) => +c.toFixed(9)));

    getPlacemarkAddress(coords, (newAddress: Array<number>) => {
      placemarkRef.current.getMap().hint.open(coords, newAddress);
    });
  };

  const handlePlacemarkDragEnd = () => {
    const coords = placemarkRef.current.geometry._coordinates;

    onChange(coords?.map((c: number) => +c.toFixed(9)));

    getPlacemarkAddress(coords, (newAddress: Array<number>) => {
      placemarkRef.current.getMap().hint.open(coords, newAddress);
    });
  };

  return (
    <div className="w-full h-[330px] border border-[#333741] rounded-xl overflow-hidden">
      <YMaps>
        <Map
          instanceRef={mapRef}
          state={{
            center: VALUE,
            zoom: 10,
          }}
          onLoad={(e) => {
            ymaps.current = e;
          }}
          width="100%"
          height="100%"
          modules={["control.ZoomControl"]}
          onClick={handleMapClick}
        >
          <Placemark
            instanceRef={placemarkRef}
            onDragEnd={handlePlacemarkDragEnd}
            geometry={VALUE}
            options={{
              draggable: true,
              preset: "islands#blueIcon",
              openEmptyHint: true,
            }}
            properties={{ iconContent: "+" }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default YMap;
