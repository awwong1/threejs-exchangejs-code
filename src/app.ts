import * as THREE from 'three';

const handleOnWindowResize = (renderer: THREE.Renderer, camera: THREE.PerspectiveCamera, scene: THREE.Scene) => (): void => {
  const aspectRatio = window.innerWidth / window.innerHeight
  camera.aspect = aspectRatio
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  if (renderer instanceof THREE.WebGLRenderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
  renderer.render(scene, camera)
}


const main = () => {
  // Initialize DOM Canvas and viewport sizes
  const canvas = <HTMLCanvasElement | null>document.getElementById('canvas')
  if (canvas === null) return
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Step 1: Initialize Scene
  const scene = new THREE.Scene();

  // Initialize the Camera and add it to the scene
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 2
  scene.add(camera)

  // Step : Initialize the Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  window.addEventListener('resize', handleOnWindowResize(renderer, camera, scene), false)
}


if (document.readyState === 'complete') {
  main()
} else {
  window.addEventListener('load', main)
}