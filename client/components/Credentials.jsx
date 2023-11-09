//import React, { useState, useEffect } from 'react';
import React from 'react';


export default function Credentials({setAccessKey, setSecretKey}) {

  const regions = []
  const regionOptions = map.
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
        <select>
            <option>region 1</option>
            <option>region 2</option>
        </select>
        </div>
    </div>
  );
};