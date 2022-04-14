import StatusCard from 'components/StatusCard';
import SettingsForm from 'components/SettingsForm';
import ProfileCard from 'components/ProfileCard';

export default function Dashboard() {
    return (
        <>
            <div className="bg-gray-200 pt-14 pb-28 px-3 md:px-8 h-auto" >
                <div className="container mx-auto max-w-full">
                 
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="w-10/12 mx-auto">
                        <div className="xl:col-start-2 xl:col-end-5 px-4 mb-16">
                            <SettingsForm />
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
