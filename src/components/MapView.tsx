import React, { useState, useEffect } from "react";
import Map, { ViewState } from "react-map-gl";
import CuboidView from "./CuboidView";
import Button from "./Button";
import { Modal, ModalContent, ModalFooter, ModalTitle } from "./Modal";
import toast from "react-hot-toast";
import { saveMapCapture, fetchLatestMapCapture } from "../slices/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import Input from "./Input";

const MapView: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: -74.0066,
    latitude: 40.7135,
    zoom: 15.5,
    bearing: -17.6,
    pitch: 45,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  const dispatch = useDispatch<AppDispatch>();
  const latestCapture = useSelector(
    (state: RootState) => state.map.latestCapture,
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const accessToken =
    "pk.eyJ1IjoidmVkYW50aGIiLCJhIjoiY2tzOWVmd2RkMWpuaDJ1czNtbGxncWg3NiJ9.wJmMymdGL6o3BcDyslhtWg";

  useEffect(() => {
    if (latestCapture) {
      setViewState({
        longitude: latestCapture.longitude,
        latitude: latestCapture.latitude,
        zoom: latestCapture.zoom,
        bearing: latestCapture.bearing,
        pitch: latestCapture.pitch,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      });
      setImageUrl(latestCapture.imageUrl);
      setLocationName(latestCapture.title);
    }
  }, [latestCapture]);

  const captureMapImage = async () => {
    const { longitude, latitude, zoom, bearing, pitch } = viewState;

    const url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${longitude},${latitude},${zoom},${bearing},${pitch}/600x400?access_token=${accessToken}`;
    setImageUrl(url);

    // Reverse geocoding to get the location name
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

    try {
      const response = await fetch(geocodeUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const placeName = data.features[0]?.place_name || "Unknown location";
      setLocationName(placeName);
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Error fetching location");
    }
  };

  const loadLastSavedMapData = () => {
    dispatch(fetchLatestMapCapture());
  };

  const saveMapData = () => {
    if (!imageUrl || !locationName) {
      toast.error("Please capture the map image first");
      return;
    }

    dispatch(
      saveMapCapture({
        title: locationName,
        longitude: viewState.longitude,
        latitude: viewState.latitude,
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch,
        imageUrl,
      }),
    );
  };

  const openModal = () => {
    if (!imageUrl || !locationName) {
      toast.error("Please capture the map image first");
      return;
    }

    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <Button onClick={loadLastSavedMapData} variant="primary">
          Load last Saved Map Region and data
        </Button>

        <Button onClick={openModal} variant="primary">
          Save Selected Map Region and data
        </Button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalTitle>Save Map Region and Data</ModalTitle>
          <ModalContent>
            <Input
              id="map_capture_title"
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Title"
              label="Title"
              required
            />
          </ModalContent>
          <ModalFooter>
            <Button
              onClick={() => {
                saveMapData();
                closeModal();
              }}
            >
              Save
            </Button>
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="flex w-full justify-center">
        <Map
          antialias={true}
          mapboxAccessToken={accessToken}
          style={{ width: "100%", height: 400 }}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          {...viewState}
        ></Map>
      </div>

      <Button onClick={captureMapImage} variant="primary">
        Capture and Apply Selected Map Region to Cuboid
      </Button>

      <div className="mt-8 flex w-full flex-col items-center lg:mt-0">
        {locationName && (
          <p className="mb-4 text-xl text-gray-700 dark:text-gray-200">
            <span className="mr-2 font-bold dark:text-gray-200">Location:</span>{" "}
            {locationName}
          </p>
        )}

        <CuboidView imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default MapView;
