
import {useRef} from 'react'

const SavedLogs =
	() => {

		
		
		const Logcheck1 =
			<div>
				<li className="HostMessages"> hello man, how are you? </li>
				<li className="ServerMessages">
					<img id="SmallImg" src="/logo1.jpg" width={200} height={200} alt="willian-justen-de-vasconcellos-Bu9xrH0ufkI-unsplash.jpg" />
					<div id="ModalImg" className="modal"><span className="close"> &times </span><img className="modal-content" id="BigImg" /></div> </li><li className="ServerMessages">  {/* */}traveling, how about you?{/* */} </li><li className="HostMessages">  <audio controls><source src="/People Talking.mp3" /></audio> </li><li className="ServerMessages">  {/* */}lol I can't here you{/* */} </li>
			</div>

		const Logcheck2 =
			<div>
				<li className="HostMessages"> hello friend! </li>
				<li className="ServerMessages">
					<img id="SmallImg" src="/flower.jpg" width={200} height={200} alt="willian-justen-de-vasconcellos-Bu9xrH0ufkI-unsplash.jpg" />
					<div id="ModalImg" className="modal"><span className="close"> &times </span><img className="modal-content" id="BigImg" /></div> </li><li className="ServerMessages"> {/* */}nice flower :){/* */} </li><li className="ServerMessages">  {/* */}talk to you later{/* */} </li>
			</div>

		const Logcheck3 =
			<div>
				<li className="HostMessages"> {/* */}hey{/* */} </li>
				<li className="HostMessages"> {/* */}I'm sending you this video{/* */} </li>
				<li className="HostMessages">  <video width="200" height="200" controls><source src="/cute dog.mp4" /></video> </li>
				<li className="ServerMessages"> {/* */}thank you!{/* */} </li>
			</div>

		const Logcheck4 =
			<div>
				<li className="HostMessages"> {/* */}I miss you!{/* */} </li>
				<img id="SmallImg" src="/heart.png" width={200} height={200} alt="willian-justen-de-vasconcellos-Bu9xrH0ufkI-unsplash.jpg" />
				<li className="ServerMessages"> {/* */}I miss you too!{/* */} </li>
				<li className="ServerMessages"> {/* */}we just need to finally meet again{/* */} </li>
			</div>

		const Logcheck5 =
			<div>
				<li className="ServerMessages"> {/* */}hi bro, how are you?{/* */} </li>
				<li className="HostMessages"> {/* */}great, you just have to watch this video!{/* */} </li>
				<li className="HostMessages">  <video width="200" height="200" controls><source src="/illusions.mp4"  /></video> </li>
				<li className="ServerMessages"> {/* */}OMG I LOVE IT!{/* */} </li>
			</div>
		
		const Logcheck6 =
			<div>
				<li className="ServerMessages"> {/* */}hi, where are you?{/* */} </li>
				<li className="HostMessages"> {/* */}I'm on my way{/* */} </li>
				<img id="SmallImg" src="/street.jpg" width={200} height={200} alt="willian-justen-de-vasconcellos-Bu9xrH0ufkI-unsplash.jpg" />
				<li className="ServerMessages"> {/* */}ok cool, everybody is waiting for you{/* */} </li>
			</div>

		const Logcheck7 =
			<div>
				<li className="HostMessages"> {/* */}hi{/* */} </li>
				<li className="HostMessages"> {/* */}when are you coming?{/* */} </li>
				<li className="ServerMessages"> {/* */}I'm a little late, don't wait for me{/* */} </li>
				<li className="HostMessages"> {/* */}are you sure? we can wait if you want{/* */} </li>
				<li className="HostMessages"> {/* */}don't worry about it{/* */} </li>
				<li className="ServerMessages"> {/* */}yes i'm sure, I'll be there by 20:00{/* */} </li>
			</div>

		const Logcheck8 =
			<div>
				<li className="ServerMessages"> {/* */}can you send me our picture?{/* */} </li>
				<li className="HostMessages"> {/* */}sure! just a second{/* */} </li>
				<img id="SmallImg" src="/two friends.jpg" width={200} height={200} alt="willian-justen-de-vasconcellos-Bu9xrH0ufkI-unsplash.jpg" />
				<li className="ServerMessages"> {/* */}thanks!{/* */} </li>
			</div>

		const Logcheck9 =
			<div>
				<li className="ServerMessages"> hello my friend, how is the beach today? </li>
				
					
				<li className="HostMessages">  {/* */}great! I'll send you some waves sound{/* */} </li>
				<li className="HostMessages">  <audio controls><source width="200" height="200" src="/waves sound.mp3" /></audio> </li><li className="ServerMessages">  {/* */}I wish I was there!{/* */} </li>
			</div>

		const Logcheck10 =
			<div>
				<li className="HostMessages"> {/* */}I NEED YOU TO HELP ME{/* */} </li>
				<li className="ServerMessages"> {/* */}what happend??{/* */} </li>
				<li className="HostMessages"> {/* */}I'm stuck{/* */} </li>
				<li className="HostMessages"> {/* */}I looked around and saw a cute cat{/* */} </li>
				<li className="HostMessages"> {/* */}the cat came and sat on me{/* */} </li>
				<li className="HostMessages"> {/* */}now I can't move{/* */} </li>
				<li className="HostMessages"> {/* */}it is so sweet{/* */} </li>
				<li className="HostMessages"> {/* */}help me{/* */} </li>
					<li className="HostMessages">  <video width="200" height="200" controls><source src="/illusions.mp4"  /></video> </li>
				<img id="SmallImg" src="/cute cat.jpg" width={200} height={200} alt="willian-justen-de-vasconcellos-Bu9xrH0ufkI-unsplash.jpg" />
				<li className="ServerMessages"> {/* */}I'm on my way!{/* */} </li>
			</div>
	

		const logs = [Logcheck1, Logcheck2, Logcheck3, Logcheck4, Logcheck5, Logcheck6, Logcheck7, Logcheck8, Logcheck9, Logcheck10];




		const giveArr =
			(value) => {
				switch (value) {
					case ('Sharon'): {
						return logs[0];
					}
					case ('Dude'): {
						return logs[1];
					}
					case ('AmazingSpooderMen'): {
						return logs[2];
					}
					case ('GoofyVelociraptor'): {
						return logs[3];
					}
					case ('Vec'): {
						return logs[4];
					}
					case ('MikeWaz'): {
						return logs[5];
					}
					case ('Darud'): {
						return logs[6];
					}
					case ('Silve'): {
						return logs[7];
					}
					case ('Monkey'): {
						return logs[8];
					}
					case ('George'): {
						return logs[9];
                    }


				}
			}
		return ({ logs, giveArr });


	}
export default SavedLogs;