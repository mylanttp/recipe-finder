import { useNavigate } from "react-router-dom";

export default function Quiz() {
    const navigate = useNavigate();
    return <div>
        <h2>Quiz Page</h2>
        <button onClick={() => navigate('/')}>back to search</button>
    </div>
}

// Page for the quiz

// Array of ints representing different qualities
// Each question has a title and 4 answer choices
// Each answer has an array of ints corresponding to how they change the user's final array
// User has a response array of ints that changes with each answer choice