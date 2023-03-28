import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

const TrainList = () => {
    const [trains, setTrains] = useState([]);

    // useEffect(()=>{
    //     fetch("/trains").then((r)=>{
    //         if (r.ok){
    //             r.json().then((trains)=>setTrains(trains));
    //         }
    //     })
    // },[])
    useEffect(() => {
        fetch("/trains")
        .then((r) => r.json())
        .then(setTrains);
    }, []);


    function handleDeleteTrain(id) {
        fetch(`/trains/${id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                setTrains((trains) =>
                trains.filter((train) => train.id !== id)
                );
            }
        });
    }

    return (
        <Wrapper>
        <h1>Trains</h1>
            {trains.length > 0 ? (
                trains.map((train) => (
                    <Train key={train.id}>
                        <Box>
                            <h2>{"Train ID: "+train.id}</h2>
                            <h2>{"Name: "+train.title}</h2>
                            <h2>{train.description}</h2>
                            <Image src={train.image_url}/>
                            <div>
                            <Button onClick={() => handleDeleteTrain(train.id)}>
                                Delete train
                            </Button>
                            </div>
                        </Box>
                    </Train>
                ))
            ) : (
                    <>
                    <h2>No Trains Found</h2>
                    <Button as={Link} to="/new_train">
                        Make a New Train
                    </Button>
                    </>
                )}
        </Wrapper>
    );
}


const Wrapper = styled.section`
    max-width: 800px;
    margin: 40px auto;
`;

const Train = styled.article`
    margin-bottom: 24px;
`;

const Image = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
`;

export default TrainList