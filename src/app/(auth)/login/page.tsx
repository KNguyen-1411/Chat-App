import FormLogin from '@/components/(auth)/login/FormLogin';
import bg from '@/styles/scss/background.module.scss';
export default function Login() {
    return (
        <div className={bg.Main}>
            <div className={bg.container}>
                {Array.from({ length: 100 }, (_, i) => (
                    <div key={i} className={bg.circleContainer}>
                        <div className={bg.circle} />
                    </div>
                ))}
            </div>
            <FormLogin />
        </div>
    );
}
