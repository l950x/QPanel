import '../assets/css/dashboard.css'
import { Icon } from '@iconify/react';
const Dashboard = () => {
  return (
    <>
    <div className='center'>
        <div className="p1">
			<div className="logo"></div>
			<p className="iconColor">Welcome
				User</p>
		</div>
		<div className="p2">
			<div className="id">
				<Icon className="icn iconColor" icon="tabler:id" width="25" height="25"></Icon>
				<p>
					<span className="iconColor">ID:</span>
					<span className="textColor">1</span>
				</p>
			</div>
			<div className="mail">
				<Icon className="icn iconColor" icon="material-symbols:mail-outline" width="25" height="25"></Icon>
				<p>
					<span className="iconColor">Mail:</span>
					<span className="textColor">Unverified</span>
				</p>
			</div>
			<div className="discord">
				<Icon className="icn iconColor" icon="ri:discord-line" width="25" height="25"></Icon>
				<p>
					<span className="iconColor">Discord:</span>
					<span className="textColor">Unverified</span>
				</p>
			</div>
			<div className="smsc">
				<Icon className="icn iconColor" icon="material-symbols:sms-outline" width="25" height="25"></Icon>
				<p>
					<span className="iconColor">SMS:</span>
					<span className="textColor">Unverified</span>
				</p>
			</div>
		</div>

		<div className="p3">
			<div className="version">
				<Icon className="shield iconColor" width="50" height="50" icon="ci:shield"></Icon>
				<p className="iconColor">Version 1.0</p>
			</div>
		</div>
		<div className="p4">
			<p>
				<span className="iconColor">SMS send:</span>
				<span className="textColor">54</span>
			</p>
			<p>
				<span className="iconColor">Registered since:</span>
				<span className="textColor">01/09/2023</span>
			</p>
			<p>
				<span className="iconColor">Call send:</span>
				<span className="textColor">13</span>
			</p>
		</div>
		<div className="p5">
			<p>
				<span className="iconColor">Last Registered:</span>
				<span className="textColor">latest_user</span>
			</p>
		</div>
    </div>
    </>
  );
};

export default Dashboard;