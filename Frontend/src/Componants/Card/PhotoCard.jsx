import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
  
  export default function PhotoCard() {
    return (
        <div>
        <Card className="w-96">
          <CardHeader floated={false} className="h-80">
            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Maria Binta Salam 
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              Nani
            </Typography>
          </CardBody>
        </Card>
    </div>
    )
  }
  
