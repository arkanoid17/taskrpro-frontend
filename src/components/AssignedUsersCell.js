import { Avatar, Tooltip } from "@mui/material";
import '../css/AssignedUsersCell.css';

const AssignedUsersCell = ({ users }) => {
  const maxVisible = 2;
  const visibleUsers = users.slice(0, maxVisible);
  const extraCount = users.length - maxVisible;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="assigned-users-container">
      {visibleUsers.map((user, index) => (
        <Tooltip key={index} title={user.name}>
          <Avatar className="assigned-user-avatar">
            {getInitials(user.name)}
          </Avatar>
        </Tooltip>
      ))}

      {extraCount > 0 && (
        <Tooltip title={users.map((u) => u.name).join(', ')}>
          <Avatar className="assigned-user-avatar extra-avatar">
            +{extraCount}
          </Avatar>
        </Tooltip>
      )}
    </div>
  );
};

export default AssignedUsersCell;
