import React from 'react';

function useRegions() {
  const regions = [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'ap-south-1',
    'ap-northeast-3',
    'ap-northeast-2',
    'ap-northeast-1',
    'ap-southeast-2',
    'ap-southeast-1',
    'ca-central-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'eu-north-1',
    'sa-south-1',
  ];

  const regionOptions = [
    <option key="default" value="">
      Select a Region
    </option>,
    ...regions.map((region, index) => (
      <option key={`Region${index}`} value={region}>
        {region}
      </option>
    )),
  ];

  return {
    regionOptions,
  };
}
export default useRegions;
