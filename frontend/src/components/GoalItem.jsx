import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(goal.text);

  // Get user authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  // Function to handle goal updates
  const handleUpdateGoal = () => {
    if (!isAuthenticated) {
      // Handle authentication check here, e.g., show an error message or redirect to login
      console.error("User is not authenticated. Cannot update goal.");
      return;
    }

    // Dispatch the updateGoal action with the goal ID and updated data
    dispatch(updateGoal({ goalId: goal._id, goalData: { text: updatedText } }));
    setIsEditing(false);
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)} // Update the text in the state
          />
          <button onClick={handleUpdateGoal}>Save</button>
        </>
      ) : (
        <>
          <h2>{updatedText}</h2> {/* Display the updatedText in non-edit mode */}
          <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
            X
          </button>
          {isAuthenticated && (
            <button onClick={() => setIsEditing(true)}>Edit Goal</button>
          )}
        </>
      )}
    </div>
  );
}

export default GoalItem;