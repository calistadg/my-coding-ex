import "./PersonalInfo.css";

function PersonalInfo() {
    const currentDate = new Date().toLocaleString();

    return (
        <div className="personal-info">
            <h1>Calista</h1>

            <p>My favorite programming language is JavaScript.</p>

            <h2>My Hobbies</h2>

            <ul>
                <li>Running</li>
                <li>Reading</li>
                <li>Trying new recipe</li>
            </ul>

            <h2>Current Date and Time</h2>
            <p>{currentDate}</p>

            <h2>My Image</h2>

            <img
                src="https://share.google/GlNFVt4w858bmmByc"
                alt="My crush"
            />
        </div>
    );
}

export default PersonalInfo;