import * as THREE from 'three';


const handleOnWindowResize = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, scene: THREE.Scene) => (): void => {
  const aspectRatio = window.innerWidth / window.innerHeight
  camera.aspect = aspectRatio
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.render(scene, camera)
}

const main = () => {
  // Initialize DOM Canvas and viewport sizes
  const canvas = <HTMLCanvasElement | null>document.getElementById('canvas')
  if (canvas === null) return

  // Initialize Scene
  const scene = new THREE.Scene()

  // Initialize the Camera and add it to the scene
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(1, 1, 2)
  scene.add(camera)

  // Adding in an ambient (directionless, illuminates everything) light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  // Adding in a directional (lightbulb, emitting rays from a source) light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
  scene.add(directionalLight)
  directionalLight.position.set(2, 2, -1)

  // Adding in a basic cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0x663399 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Initialize the Renderer
  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  window.addEventListener('resize', handleOnWindowResize(renderer, camera, scene), false)

  // Render loop
  const tick: FrameRequestCallback = (curTime) => {
    const elapsedTime = curTime / 1000
    renderer.render(scene, camera)

    // make cube rotate (Euler angles, radians) and set camera focus
    mesh.rotation.set(elapsedTime, elapsedTime, elapsedTime)
    camera.lookAt(mesh.position)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }
  window.requestAnimationFrame(tick)
}


if (document.readyState === 'complete') {
  main()
} else {
  window.addEventListener('load', main)
}
