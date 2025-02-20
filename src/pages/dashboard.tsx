import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const DashboardPage = () => {
    const user = useSelector((state: RootState) => state.auth);

    return (
        <h1>
            Dashboard Page
        </h1>
    )
}

export default DashboardPage