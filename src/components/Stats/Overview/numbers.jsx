import doctor from '../../../assets/images/Stats/Overview/doctor.png';
import nurse from '../../../assets/images/Stats/Overview/nurse.png';
import patient from '../../../assets/images/Stats/Overview/patient.png';
import styles from '../../../assets/css/Stats/Overview/numbers.module.css';
import { useState, useEffect } from 'react';

export const Numbers = () => {
    const [doctorCount, setDoctorCount] = useState(0);
    const [nurseCount, setNurseCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [doctorTarget, setDoctorTarget] = useState(0);
    const [nurseTarget, setNurseTarget] = useState(0);
    const [patientTarget, setPatientTarget] = useState(0);

    // Fetch data from backend
    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await fetch("http://localhost:8080/StaffPatientStats");
                if (!response.ok) {
                    console.log("Error fetching stats:", response.statusText);
                    return;
                }
                const data = await response.json();
                setDoctorTarget(data[0].doctors || 0);
                setNurseTarget(data[0].nurses || 0);
                setPatientTarget(data[0].patients || 0);
            } catch (err) {
                console.log("Fetch error:", err.message);
            }
        };
        getStats();
    }, []); // Runs once on mount

    // Reusable counter animation function
    const animateCounter = (currentCount, targetCount, setCount, intervalTime) => {
        if (currentCount >= targetCount) return; // No need to animate if already at or above target
        const intervalId = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount >= targetCount) {
                    clearInterval(intervalId);
                    return targetCount; // Lock to target value
                }
                return prevCount + 1;
            });
        }, intervalTime);
        // Cleanup interval on unmount or target change
        return () => clearInterval(intervalId);
    };

    // Animate counters when target values change
    useEffect(() => animateCounter(doctorCount, doctorTarget, setDoctorCount, 89), [doctorTarget]);
    useEffect(() => animateCounter(nurseCount, nurseTarget, setNurseCount, 89), [nurseTarget]);
    useEffect(() => animateCounter(patientCount, patientTarget, setPatientCount, 45), [patientTarget]);

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <img src={doctor} alt="doctor logo" className={styles.logo} />
                <div className={styles.number}>{doctorCount}</div>
                <div className={styles.desc}>
                    <span className={styles.occ}>Docteurs</span>
                    <span className={styles.annee}>Année 2024-2025</span>
                </div>
            </div>

            <div className={styles.innerContainer}>
                <img src={nurse} alt="nurse logo" className={styles.logo} />
                <div className={styles.number}>{nurseCount}</div>
                <div className={styles.desc}>
                    <span className={styles.occ}>Infirmières</span>
                    <span className={styles.annee}>Année 2024-2025</span>
                </div>
            </div>

            <div className={styles.innerContainer}>
                <img src={patient} alt="patient logo" className={styles.logo} />
                <div className={styles.number}>{patientCount}</div>
                <div className={styles.desc}>
                    <span className={styles.occ}>Patients</span>
                    <span className={styles.annee}>Année 2024-2025</span>
                </div>
            </div>
        </div>
    );
};