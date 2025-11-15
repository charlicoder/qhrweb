import { Card, CardContent} from "@/components/ui/card";
import { MTForm } from "./MTForm";

const MassTransactions = () => {
    return (
        <Card className="rounded-none">
            
            <CardContent className="border-0">
                <MTForm />
            </CardContent>
        </Card>
    );
};

export default MassTransactions;