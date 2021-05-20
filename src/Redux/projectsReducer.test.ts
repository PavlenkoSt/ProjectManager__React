import projectsReducer, {projectsActions} from './projectsReducer'

const state = {
    projects: [
        {id: 1, core: 'some core', name: 'some name', completed: false, desc: '', link: 'some-core-some-name'},
        {id: 2, core: 'some core', name: 'some name', completed: false, desc: '', link: 'some-core-some-name'},
    ],
    filterOption: 'all'
}

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