import React, { useEffect, useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3, StandardMaterial, Texture, Mesh } from "@babylonjs/core";

interface CuboidViewProps {
  imageUrl: string;
}

const CuboidView: React.FC<CuboidViewProps> = ({ imageUrl }) => {
  const boxRef = useRef<Mesh | null>(null);

  useEffect(() => {
    if (imageUrl && boxRef.current) {
      const box = boxRef.current;
      const scene = box.getScene();
      const material = new StandardMaterial("boxMaterial", scene);
      material.diffuseTexture = new Texture(imageUrl, scene);
      box.material = material;
    }

    return () => {
      if (boxRef.current) {
        boxRef.current.dispose(); // Clean up Babylon.js resources
      }
    };
  }, [imageUrl]);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 4}
            beta={Math.PI / 4}
            radius={6}
            target={Vector3.Zero()}
            minZ={0.001}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <box
            name="box"
            ref={boxRef}
            size={2}
            position={new Vector3(0, 0, 0)}
            rotation={new Vector3(0, 0, 0)}
            scaling={new Vector3(2, 1, 1)}
          />
        </Scene>
      </Engine>
    </div>
  );
};

export default CuboidView;
