import React, {useEffect, useState} from 'react';
import '../src/styles.css';

export default function ConsoleNav({handleThemeButtonClick, themeButton, logGroups}) {
    const [logGroupOptions, setLogGroupOptions] = useState([]);

    useEffect(() => {
        // Assuming logGroups is an array. Adjust as needed for your data structure.
        if (logGroups && Array.isArray(logGroups)) {
            const options = logGroups.map((logGroup, index) => (
                <option key={index} value={logGroup}>{logGroup}</option>
            ));
            setLogGroupOptions(options);
        }
    }, [logGroups]);

  return (
    <div>
            Console Navbar
            <select>
                <option key="default" value="">Select a Log Group</option>
                {logGroupOptions}
            </select>
            <select>Select Theme</select>
            <button onClick={handleThemeButtonClick}>{themeButton}</button>
        </div>
  );
};