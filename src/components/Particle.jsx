
import Particles from "react-tsparticles";
import ParticlesConfig from "./config/Particles-config";
import { loadFull } from "tsparticles";
function Particle() {
	async function loadParticles(main){
		await loadFull(main);
	}
	return (
		<Particles
		id="tsparticles"
		init={loadParticles}
		options={ParticlesConfig}
		/>
	);
}
export default Particle;