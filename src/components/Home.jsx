import hero from './assets/hero.png'
import wave from './assets/wave1.png'
import gym from './assets/hero.png'
import "./home.css" // Keep the import for the file, though its content is now effectively replaced by Tailwind

function Home(){
    return(
        <>
        <div className="w-full h-[700px] bg-cyan-400 flex bg-gradient-to-l from-black via-black to-blue-900">
            <div className="w-1/2 h-full pt-[10%] pl-12">
                <div className="one-sec">
                        <p className="text-6xl font-bold text-beige-200 m-0.5">Build Your</p>
                        <p className="text-6xl font-bold text-beige-200 m-0.5">Dream Physiqe</p>
                        <h3 className='text-4xl font-bold'>
                            <span className='text-6xl text-cyan-400'>Bodybuilding</span>
                        </h3>
                </div>
                <p className="text-gray-300 relative mt-[20%]">A place where passion and ambition meet,where champions train and compete with true sportsmanship.We offer state-of-the-art facilities and intensive training programs led by professional coaches.</p>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
                    <img className='w-3/4 h-11/12' src={hero} alt="Home Image"></img>
            </div>
        </div>
        <div className="bg-gradient-to-l from-black via-black to-blue-900 w-full">
                <img className='w-full translate-y-2.5' src={wave}></img>
        </div>
        </>
    );
}

export default Home