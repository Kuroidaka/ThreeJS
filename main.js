import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import galaxy from './assert/img/galaxy.jpg'

const renderer = new THREE.WebGLRenderer()
const textureLoader = new THREE.TextureLoader()

renderer.setSize(window.innerWidth, window.innerHeight)

renderer.shadowMap.enabled = true


document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)   

// scene.background = textureLoader.load(galaxy)
renderer.setClearColor(0x00)
// const cubeTextureLoader = new THREE.CubeTextureLoader()
// scene.background = cubeTextureLoader.load([
//     galaxy,
//     galaxy,
//     galaxy,
//     galaxy,
//     galaxy,
//     galaxy,
// ])


const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

camera.position.set(0, 2, 40)
orbit.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshStandardMaterial(
    {color: 0x00ff00}

)
const box = new THREE.Mesh(boxGeometry, boxMaterial)

scene.add(box)
box.castShadow = true

// PLANE
const planeGeometry = new THREE.PlaneGeometry(60, 60)
const PlaneMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide
    })
const plane = new THREE.Mesh(planeGeometry, PlaneMaterial)

scene.add(plane)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true

// GRID HELPER
const gridHelper = new THREE.GridHelper(60)

scene.add(gridHelper)

// SHPERE
const sphereGeometry = new THREE.SphereGeometry(5, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,

})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
// scene.add(sphere)
sphere.position.set(-10, 5, 0)
sphere.castShadow = true

// BOX 2
const box2Geometry = new THREE.BoxGeometry(5, 10, 10)
const box2Material = new THREE.MeshStandardMaterial({
    color: 0xFFF0FF,
    map: textureLoader.load(galaxy)
})

const box2MuilipleMaterial = [
    // new THREE.MeshStandardMaterial({map: textureLoader.load(galaxy)}),
    // new THREE.MeshStandardMaterial({map: textureLoader.load(galaxy)}),
    // new THREE.MeshStandardMaterial({map: textureLoader.load(galaxy)}),
    // new THREE.MeshStandardMaterial({map: textureLoader.load(galaxy)}),
    // new THREE.MeshStandardMaterial({map: textureLoader.load(galaxy)}),
    new THREE.MeshStandardMaterial({color: 0xFFEEEE}),
    new THREE.MeshStandardMaterial({color: 0xFFEEEE}),
    new THREE.MeshStandardMaterial({color: 0xFFEEEE}),
    new THREE.MeshStandardMaterial({color: 0xFFEEEE}),
    new THREE.MeshStandardMaterial({color: 0xFFEEEE}),
    new THREE.MeshStandardMaterial({color: 0xFFEEEE}),


]
const box2 = new THREE.Mesh(box2Geometry, box2MuilipleMaterial)

scene.add(box2)
box2.position.set(5, 5, 0)
box2.receiveShadow = true
box2.castShadow = true

// PLANE 2
const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10)
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
})

const plane2 = new THREE.Mesh(plane2Geometry, plane2Material)

scene.add(plane2)


plane2.castShadow = true
plane2.receiveShadow = true
plane2.position.set(0, 5, -15)
const plane2ArrayLenght = plane2.geometry.attributes.position.array.length -1 

// FOG
scene.fog = new THREE.Fog(0xFFFFFF, 0, 200)
// scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01)


const gui = new dat.GUI()

//  SPHERE GUI
const options = {
    sphereColor: '0x000',
    wireframe: false,
    speed: 0.01,
    angle: .2,
    penumbra: .2,
    intensity: .5
}


gui.add(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e)

})
gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e
})

gui.add(options, 'speed', 0, 0.1)

gui.add(options, 'angle', 0, 1)

gui.add(options, 'penumbra', 0, 1)

gui.add(options, 'intensity', 0, 1)
let step = 1 

//  AMBIENT LIGHT
const AmbientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)

scene.add(AmbientLight)

// // Directional Light
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF)

// scene.add(directionalLight)

// directionalLight.position.set(-30, 50 ,0)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.bottom = - 12
// // Directional Light Helper
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)

// scene.add(dLightHelper)

// // Directional Light shadow Helper 

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

// scene.add(dLightShadowHelper)


//  SPOT LIGHT 
const spotLight = new THREE.SpotLight(0xFFFFFF)
scene.add(spotLight)
spotLight.position.set(-30, 30, 0)
spotLight.castShadow = true


//  SPOT LIGHT HELPER
const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)


const mousePosition = new THREE.Vector2()

window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1
})

const rayCaster = new THREE.Raycaster()

box2.name = 'box2'



const animate = (time) => {

    plane2.rotateY(0.02)

    box.rotation.x = time / 1000  
    box.rotation.y = time / 1000
    step += options.speed
    box.position.y = 10 * Math.abs(Math.sin(step))
    sphere.position.y = 10 * Math.abs(Math.sin(step))
    
    spotLight.angle = options.angle
    spotLight.penumbra = options.penumbra
    spotLight.intensity = options.intensity
    sLightHelper.update()

    rayCaster.setFromCamera(mousePosition, camera)
    const intersects = rayCaster.intersectObjects(scene.children)


for(let i = 0; i < plane2ArrayLenght; i++) { 
    plane2.geometry.attributes.position.array[i] = 10 * Math.random()
    plane2.geometry.attributes.position.needsUpdate = true
}

    for(let i = 0 ; i < intersects.length; i++) {
        if(intersects[i].object.name === 'box2') {
            console.log("yes");
            intersects[i].object.rotation.x = time / 1000  
            intersects[i].object.rotation.y = time / 1000
        }
    }

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})