import { CircularProgress, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import ApiSelect from "../components/ApiSelect";
import ServerConstants from "../server/ServerConstants";
import apiCall from "../server/ApiCall";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import AssignedUsersCell from "../components/AssignedUsersCell";
import EditIconOutlined from '@mui/icons-material/EditOutlined';
import '../css/Tasks.css';
import FlagIcon from '@mui/icons-material/Flag';
import SelectDropdown from "../components/SelectDropdown";
import ApiMultiSelect from "../components/ApiMultiSelect";


const Tasks = () => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [hasNext, setHasNext] = useState(false);
    const [projectId, setProjectId] = useState(0);
    
    const [filters, setFilters] = useState({
        status: 'All',
        priority: 'All',
        assignedTo: [],
    });

    useEffect(() => {
        if (projectId) {
            fetchTasks(projectId, filters);
        }
    }, [projectId]);

    const onProjectChanged = (value) => {
        setProjectId(value);
    };

    const fetchTasks = async (projectId, activeFilters) => {
        setLoading(true);
        
        let query = `&page=${page}&size=40`;

        if (activeFilters.status && activeFilters.status !== 'All') {
            query += `&status=${activeFilters.status}`;
        }
        if (activeFilters.priority && activeFilters.priority !== 'All') {
            query += `&priority=${activeFilters.priority}`;
        }
        if (activeFilters.assignedTo && activeFilters.assignedTo.length > 0) {
            query += `&assignedTo=${activeFilters.assignedTo.join(",")}`;
        }

        apiCall({
            url: ServerConstants.baseUrl + ServerConstants.taskByProject + projectId + query,
            method: "GET",
            data: null,
            headers: {},
            onSuccess: onTaskFetchSuccess,
            onError: onTaskFetchError
        });
    };

    const onTaskFetchSuccess = (data) => {
        setLoading(false);
        let tsk = page === 0 ? [] : [...tasks];
        tsk.push(...data['content']);
        setTasks(tsk);
        handlePages(data['pageable']);
    };

    const handlePages = (pageable) => {
        setHasNext(pageable['totalPages'] === (page + 1));
    };

    const onTaskFetchError = (e) => {
        setLoading(false);
    };

    const formatRegularCase = (text) => {
        if (!text) return '';
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleStatusFilterChange = (value) => {
        setFilters(prev => ({
            ...prev,
            status: value,
        }));
        fetchTasks(projectId, { ...filters, status: value });
    };

    const handlePriorityFilterChange = (value) => {
        setFilters(prev => ({
            ...prev,
            priority: value,
        }));
        fetchTasks(projectId, { ...filters, priority: value });
    };

    const handleAssignedToChange = (values) => {
        setFilters(prev => ({
            ...prev,
            assignedTo: values,
        }));
        fetchTasks(projectId, { ...filters, assignedTo: values });
    };

    return (
        <div>

            <ApiSelect
                apiUrl={ServerConstants.baseUrl + ServerConstants.projects}
                label={'Projects'}
                onChange={onProjectChanged}
            />

            <br />
            <br />

            <div className="filters-div">
                <SelectDropdown
                    options={['All', 'Pending', 'In-progress', 'Completed']}
                    label={'Status'}
                    onChange={handleStatusFilterChange}
                />

                &nbsp;
                &nbsp;
                &nbsp;

                <SelectDropdown
                    options={['All', 'Low', 'Medium', 'High']}
                    label={'Priority'}
                    onChange={handlePriorityFilterChange}
                />

                &nbsp;
                &nbsp;
                &nbsp;

                <ApiMultiSelect
                    apiUrl={ServerConstants.baseUrl + ServerConstants.membersOfProject.replace('projectId', `${projectId}`)}
                    label={'Assigned To'}
                    onChange={handleAssignedToChange}
                />
            </div>

            <br />

            {
                loading ?
                    <CircularProgress color="secondary" size={24} /> :
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
                                    <TableCell key='edit' className="table-header"></TableCell>
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell key='title' className="table-title-value">{task.title}</TableCell>
                                        <TableCell key='assignedUsers' className="table-value"><AssignedUsersCell users={task.assignedUsers} /> </TableCell>
                                        <TableCell key='status' className="table-value">
                                            <div className={task.status === 'PENDING' ? 'status-chip-pending' : task.status === 'COMPLETED' ? 'status-chip-completed' : 'status-chip-in-progress'}>
                                                {task.status!=null?task.status.replace('_', '-'):''}
                                            </div>
                                        </TableCell>
                                        <TableCell key='priority' className="table-value">
                                            <div className="priority-div">
                                                <FlagIcon className={task.priority === 'LOW' ? 'priority-icon-low' : task.priority === 'MEDIUM' ? 'priority-icon-medium' : 'priority-icon-high'} />
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
                                        <TableCell>
                                            <IconButton color="secondary" disableRipple>
                                                <EditIconOutlined className="row-edit"/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
            }

        </div>
    );
};

export default Tasks;
