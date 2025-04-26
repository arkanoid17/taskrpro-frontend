class ServerConstants{
    static baseUrl = "http://localhost:8081";
    static loginUrl = "/auth/login";
    static me = "/auth/me";
    static projects = "/project/list";
    static taskByProject = "/task/list?projectId="
    static membersOfProject = "/project/id/projectId/members";

    
}

export default ServerConstants;
