import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
    searchParams,
    params: { userId },
}) => {
    const appointmentId = (searchParams?.appointmentId || "");
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
    );

    return (
        <div className="flex flex-col items-center justify-center h-screen px-[5%]">
            <div className="flex flex-col items-center justify-center success-img text-center">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="h-10 w-fit mx-auto mt-10"
                    />
                </Link>

                <section className="flex flex-col items-center mt-6" style={{marginTop:"20px"}}>
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">appointment request</span> has<br/>
                        been successfully submitted!
                    </h2>
                    <p>We&apos;ll be in touch shortly to confirm.</p>
                </section>

                <section className="flex justify-center items-center request-details mt-20">
                    <p>Requested appointment details: </p>
                    <div className="flex justify-center items-center mt-2" style={{marginLeft:"20px",marginRight:"20px"}}>
                        <Image
                            src={doctor?.image}
                            alt="doctor"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <p className="whitespace-nowrap" style={{marginLeft:"12px"}}>Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <Image
                            src="/assets/icons/calendar.svg"
                            height={24}
                            width={24}
                            alt="calendar"
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant="outline" style={{marginTop:"40px", marginBottom:"40px"}} className="shad-primary-btn" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className="copyright mt-6">© 2024 CarePluse</p>
            </div>
        </div>

    );
};

export default RequestSuccess;
