import projectsReducer, {ADD_NEW_PROJECT, CHANGE_FILTER_OPTION, DELETE_PROJECT, projectsActions, SET_PROJECTS_FROM_LS} from './projectsReducer'

const state = {
    projects: [
        {id: 1, core: 'some core', name: 'some name', completed: false, desc: '', link: 'some-core-some-name'},
        {id: 2, core: 'some core', name: 'some name', completed: false, desc: '', link: 'some-core-some-name'},
    ],
    filterOption: 'all'
}


describe('actions', () => {
    it('should create an action to add new project', () => {
        const expectedAction = {
            type: ADD_NEW_PROJECT,
            name: 'some name',
            core: 'some core',
            desc: 'some desc'
        }
      expect(projectsActions.addNewProject('some name', 'some core', 'some desc')).toEqual(expectedAction)
    })

    it('should create an action to delete project', () => {
        const expectedAction = {
            type: DELETE_PROJECT,
            id: 1
        }
        expect(projectsActions.deleteProject(1)).toEqual(expectedAction)
    })

    it('should create an action to change filter option', () => {
        const expectedAction = {
            type: CHANGE_FILTER_OPTION,
            filterOption: 'completed'
        }
        expect(projectsActions.changeFilterOption('completed')).toEqual(expectedAction)
    })

    it('should create an action to add project from local storage', () => {
        const expectedAction = {
            type: SET_PROJECTS_FROM_LS,
            projects: [
                {
                    id: 1, 
                    name: 'some name',
                    core: 'some core',
                    desc: 'some desc',
                    completed: false, 
                    link: 'some link'
                }
            ]
        }
        expect(projectsActions.setProjectsFromLS([
            {
                id: 1, 
                name: 'some name',
                core: 'some core',
                desc: 'some desc',
                completed: false, 
                link: 'some link'
            }
        ])).toEqual(expectedAction)
    })
})


describe('reducers', () => {
    it('projects length should be increment', () => {
        const action = projectsActions.addNewProject('name', 'core', '')
        const modernizedStateProjects = projectsReducer(state, action)
        expect(modernizedStateProjects.projects.length).toBe(3)
    })
    
    it('projects length should be decrement', () => {
        const action = projectsActions.deleteProject(1)
        const modernizedStateProjects = projectsReducer(state, action)
        expect(modernizedStateProjects.projects.length).toBe(1)
    })
    
    it('filtered option should be change', () => {
        const action = projectsActions.changeFilterOption('completed')
        const modernizedStateProjects = projectsReducer(state, action)
        expect(modernizedStateProjects.filterOption).toBe('completed')
    })
    
    it('projects should be deleted and installed new', () => {
        const action = projectsActions.setProjectsFromLS([
            {id: 1, core: 'new core', name: 'some name', completed: false, desc: '', link: 'some-core-some-name'}
        ])
        const modernizedStateProjects = projectsReducer(state, action)
        expect(modernizedStateProjects.projects.length).toBe(1)
        expect(modernizedStateProjects.projects[0].core).toBe('new core')
    })
})