import React from 'react';

function RegionSelect({ region, setRegion, regionOptions }) {
  return (
    <select value={region} onChange={(e) => setRegion(e.target.value)}>
      {regionOptions}
    </select>
  );
}

export default RegionSelect;
