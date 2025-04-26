import { CircularProgress, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import ApiSelect from "../components/ApiSelect";
import ServerConstants from "../server/ServerConstants";
import apiCall from "../server/ApiCall";
import { useState } from "react";
import moment from "moment/moment";
import AssignedUsersCell from "../components/AssignedUsersCell";
import EditIcon from '@mui/icons-material/Edit';
import '../css/Tasks.css';
import FlagIcon from '@mui/icons-material/Flag';


const Tasks = () => {

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [hasNext, setHasNext] = useState(false);

    const onProjectChanged = (value) => {
        fetchTasks(value);
    }

    const fetchTasks = async(projectId) => {
        setLoading(true);
        apiCall({
            url: ServerConstants.baseUrl+ServerConstants.taskByProject+projectId+`&page=${page}&size=40`,
            method: "GET",
            data: null,
            headers: {},
            onSuccess: onTaskFetchSuccess,
            onError: onTaskFetchError
        });
    }

    const onTaskFetchSuccess = (data) => {
        setLoading(false);
        console.log(data);
        let tsk = page === 0 ? [] : [...tasks];
        tsk.push(...data['content']);
        setTasks(tsk);
        handlePages(data['pageable']);
    }

    const handlePages = (pageable) => {
        setHasNext(pageable['totalPages']===(page+1));
    }

    const onTaskFetchError = (e) => {
        setLoading(false);
    }

    
    const formatRegularCase = (text) => {
        if (!text) return '';
        return text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };

    return (

        <div>

       <ApiSelect
        apiUrl={ServerConstants.baseUrl+ServerConstants.projects}
        label={'Projects'}
        onChange={onProjectChanged}
       />

       <br/>
       <br/>

       
       {
        loading?
            <CircularProgress color="secondary" size={24}/>:
            <div className="table-div">

                <Table className="table-root">
                    <TableHead>
                        <TableRow>
                            <TableCell key='task_name' className="table-header">Task Name</TableCell>
                            <TableCell key='assigned_to' className="table-header">Assigned To</TableCell>
                            <TableCell key='status' className="table-header">Status</TableCell>
                            <TableCell key='priority' className="table-header">Priority</TableCell>
                            <TableCell key='assigned_date' className="table-header">Assigned Complete Date</TableCell>
                            <TableCell key='complete_date' className="table-header">Completed Date</TableCell>
                            <TableCell key='created_by' className="table-header">Created By</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {tasks.map((task)=>(
                            <TableRow  key={task.id}>
                                <TableCell key='title' className="table-title-value">{task.title}</TableCell>
                                <TableCell key='assignedUsers' className="table-value"><AssignedUsersCell users={task.assignedUsers} /> </TableCell>
                                <TableCell key='status' className="table-value">
                                <div className={task.status==='PENDING'?'status-chip-pending':task.status==='COMPLETED'?'status-chip-completed':'status-chip-in-progress'}>
                                    {task.status.replace('_','-')}
                                </div>
                                </TableCell>
                                <TableCell key='priority' className="table-value">
                                <div className="priority-div">
                                    <FlagIcon className={task.priority=='LOW'?'priority-icon-low':task.priority==='MEDIUM'?'priority-icon-medium':'priority-icon-high'}/>
                                    <div className="priority-text">{formatRegularCase(task.priority)}</div>
                                </div>
                                </TableCell>
                                <TableCell key='assignedCompleteDate' className="table-value">
                                    {task.assignedCompleteDate != null ? (
                                        <>
                                        {moment(task.assignedCompleteDate).format('D MMMM')}&nbsp; &nbsp;
                                        {moment(task.assignedCompleteDate).format('h:mm A')}
                                        </>
                                    ) : ''}
                                </TableCell>
                                <TableCell key='actualCompleteDate' className="table-value">
                                    {task.actualCompleteDate != null ? (
                                        <>
                                        {moment(task.actualCompleteDate).format('D MMMM')}&nbsp; &nbsp;
                                        {moment(task.actualCompleteDate).format('h:mm A')}
                                        </>
                                    ) : ''}
                                </TableCell>
                                <TableCell key='createdBy' className="table-value"><AssignedUsersCell users={[task.createdBy]} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        }

        </div>
       


    );
}

export default Tasks;