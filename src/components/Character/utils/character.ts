/**
 * Character loader: decrypts GLB, loads with GLTFLoader + DRACO, compiles for
 * the renderer, then sets up scroll timelines (setCharTimeline, setAllTimeline)
 * and foot positions. Returns { loadCharacter } for Scene to call.
 */
import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return decryptFile("/models/character.enc", "Character3D#@")
      .then((encryptedBlob) => {
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        return new Promise<GLTF | null>((resolve, reject) => {
          loader.load(
            blobUrl,
            (gltf) => {
              const character = gltf.scene;
              renderer
                .compileAsync(character, camera, scene)
                .then(() => {
                  character.traverse((child: THREE.Object3D) => {
                    if (child instanceof THREE.Mesh) {
                      child.castShadow = true;
                      child.receiveShadow = true;
                      child.frustumCulled = true;
                    }
                  });
                  resolve(gltf);
                  setCharTimeline(character, camera);
                  setAllTimeline();
                  character.getObjectByName("footR")!.position.y = 3.36;
                  character.getObjectByName("footL")!.position.y = 3.36;
                  dracoLoader.dispose();
                })
                .catch(reject);
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        });
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  };

  return { loadCharacter };
};

export default setCharacter;
