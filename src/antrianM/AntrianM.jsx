import React from 'react';
import axios from "axios";
import useSWR from "swr";

const KarcisList = ()=>{

    const fetcher = async()=>{
        const response = await axios.get("http://localhost:5000/api/antrianM");
        return response.data;
    };

    const { data } = useSWR('antrianM', fetcher);
    if (!data) {
        return <h2>loading ..... ....... ......</h2>
    }

    return(
    <>
        <header className="App-header">
            <h1 style={{ marginBottom:"10px" }}>MESIN ANTRIAN</h1>
            <h4 style={{ marginTop:"0px",marginBottom:"40px" }}>SILAHKAN AMBIL NO ANTRIAN DISINI</h4>
            <div className="Karcis-container">
                {data.map((antrians, index)=>(
                <div className="Karcis-wrapper" key={antrians.uuid}>
                    <div className="Karcis-tittle">{antrians.namaAntrian}</div>
                    <div className="Karcis-rate">klik disini</div>
                </div>
                ))}
                
            </div>
        </header>
    </>
    )
}

export default KarcisList