<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>              
              <!-- Begin Toolbar -->
              <v-toolbar class="primary primaryText--text">
                <v-toolbar-title> Project </v-toolbar-title>
                <v-spacer></v-spacer>

                  <!-- Add Dialog Button -->
                <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                  <v-btn class="primaryText--text" icon slot="activator">
                    <v-icon> control_point </v-icon>
                  </v-btn>

                  <!-- Add Dialog -->
                  <projectAddDialog @closeAdd="addDialog = false" @alert="alert">
                  </projectAddDialog>
                </v-dialog> 
              </v-toolbar>
                <!-- List of project -->
              <span  v-if="project.length">
                <projectItem v-for="projects in project" :key="projects._id"
                 :project="projects" @setUpEdit="setupEdit(projects)"
                 @setUpDelete="setupDelete(projects)">
                 </projectItem>
              </span>
              <v-card v-else class="headline text-xs-center">No projects to show</v-card>

              <!-- Begin Delete Dialog -->
              <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                <!-- <projectDeleteDialog :project="projectToDelete" @closeDelete="deleteDialog = false"
                @alert="alert"> 

                </projectDeleteDialog>-->
              </v-dialog>
              <!-- End Delete Dialog -->

              <!-- Begin Edit Form -->
              <v-dialog v-model="editDialog" lazy absolute max-width="50%">
                <!--<projectEditDialog :rules="rules" :project="projectToEdit" :editName="editName"
                @closeEdit="editDialog = false; projectToEdit = {}" @alert="alert">
                </projectEditDialog>-->
              </v-dialog>
              <!-- End Edit Form -->
              
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
import { http } from '../config/http.js';
import projectItem from '../components/project.vue';
import projectAddDialog from '../components/projectAddDialog.vue';
import projectEditDialog from '../components/projectEditDialog.vue';
import projectDeleteDialog from '../components/projectDeleteDialog.vue';

export default {
  //Variables
  data: () => ({
    errors: [],
    project: [],
    projectToDelete: {},
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    projectToEdit: {},
    newProject: {},
    addDialog: false,
    deleteDialog: false,
    editDialog: false,
    editName: '',
  }),

  //Components this page will need
  components: {
    projectItem: projectItem,
    projectAddDialog: projectAddDialog,
    projectEditDialog: projectEditDialog,
    projectDeleteDialog: projectDeleteDialog,
  },

  //The methods we will need
  methods: {
    //load all project from DB, we call this often to make sure the data is up to date
    load() {
      http
        .get('project')
        .then(response => {
          this.project = response.data.project;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    //opens delete dialog
    setupDelete(project) {
      this.projectToDelete = project;
      this.deleteDialog = true;
    },

    //opens edit dialog
    setupEdit(project) {
      Object.keys(project).forEach(key => {
        this.projectToEdit[key] = project[key];
      });
      this.editName = project.project_name;
      this.editDialog = true;
    },

    //get those project
    mounted() {
      this.load();
    },
  },

  //get those project
  mounted() {
    this.load();
  },
};
</script>