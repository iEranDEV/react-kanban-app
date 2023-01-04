import NavBar from './components/NavBar'
import PageSection from './components/PageSection';

function App() {
	return (
		<div className="w-full flex flex-col md:flex-row md:h-screen min-h-[32rem]">
			<NavBar></NavBar>
			<PageSection></PageSection>
		</div>
	);
}

export default App;
