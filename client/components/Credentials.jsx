//import React, { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';



export default function Credentials({setAccessKey, setSecretKey, setRegion, getLogs, accessKey, secretKey, region}) {
  const regions = [
    "us-east-1", 
    "us-east-2",
    "us-west-1",
    "us-west-2",
    "ap-south-1",
    "ap-northeast-3",
    "ap-northeast-2",
    "ap-northeast-1",
    "ap-southeast-2",
    "ap-southeast-1",
    "ca-central-1",
    "eu-central-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    "eu-north-1",
    "sa-south-1"
  ];
  
  const regionOptions = regions.map((region, index) => {
    return (<option key={index} value={region}>{region}</option>)
  })

  return (
    <div className='Head'>
        <h3>Enter Credentials</h3>
        <div>
            <form>
                <label>Access Key
                    <input type="text" 
                    onChange={(e) => setAccessKey(e.target.value)}
                    />
                </label>
            </form>
            <form>
                <label>Secret Key
                    <input type="text" 
                    onChange={(e) => setSecretKey(e.target.value)}
                    />
                </label>
            </form>
            <select onChange={(e) => setRegion(e.target.value)}>
                {regionOptions}
            </select>
            <Link to='/console'><button onClick={() => getLogs(accessKey, secretKey, region)}>submit</button></Link>
        </div>
    </div>
  );
};