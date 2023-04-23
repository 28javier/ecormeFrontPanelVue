<template>
    <div class="d-flex align-items-center bg-auth border-top border-top-2 border-primary" style="height: 100% !important">
        <div class="container borderWhado">
            <div class="row justify-content-center">
                <div class="col-12 col-md-5 col-xl-4 my-5">

                    <!-- Heading -->
                    <h1 class="display-4 text-center mb-3">
                        Ingreso Admin
                    </h1>

                    <!-- Subheading -->
                    <p class="text-muted text-center mb-5">
                        Licoreia la Sabrosa.
                    </p>

                    <!-- Form -->
                    <form>
                        <div v-if="msg_error" class="alert alert-danger" role="alert">
                            {{ msg_error }}
                        </div>
                        <!-- Email address -->
                        <div class="form-group">
                            <!-- Label -->
                            <label class="form-label">
                                Email
                            </label>
                            <!-- Input -->
                            <input v-model="email" type="email" class="form-control" placeholder="Ingrese su email">
                        </div>

                        <!-- Password -->
                        <div class="form-group">
                            <div class="row">
                                <div class="col">
                                    <!-- Label -->
                                    <label class="form-label">
                                        Password
                                    </label>
                                </div>
                            </div> <!-- / .row -->

                            <!-- Input group -->
                            <div class="input-group input-group-merge">
                                <!-- Input -->
                                <input v-model="password" class="form-control" type="password"
                                    placeholder="Ingrese su contraseña">
                                <!-- Icon -->
                                <span class="input-group-text">
                                    <i class="fe fe-eye"></i>
                                </span>
                            </div>
                        </div>

                        <!-- Submit -->
                        <button type="button" class="btn btn-lg w-100 btn-primary mb-3" v-on:click="validar()">
                            Igresar
                        </button>
                    </form>
                </div>
            </div> <!-- / .row -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/index';

export default {
    name: 'LoginApp',
    data() {
        return {
            email: '',
            password: '',
            msg_error: ''
        }
    },
    created() {
        console.log(this.$url);
    },
    methods: {
        validar() {
            if (!this.email) {
                this.msg_error = 'Ingrese un correo electronico';
            } else if (!this.password) {
                this.msg_error = 'Ingrese un password'
            } else {
                this.msg_error = '';
                this.login();
            }
            console.log(this.msg_error);
        },

        login() {
            let data = {
                email: this.email,
                password: this.password
            }
            axios.post(this.$url + '/login_usuario', data, {
                headers:{'Content-Type':'application/json'}
            }).then((result) => {
                console.log(result);
                if (result.data.data == undefined) {
                    this.msg_error = result.data.message;
                } 
                if (result.data.token) {
                    // localStorage.setItem('token', result.data.token);
                    // localStorage.setItem('user', JSON.stringify(result.data.usuario));
                    this.$store.dispatch('saveToken',result.data.token)
                    // redirecion
                    this.$router.push({name: 'dashboard'})
                }
            
            }).catch((error) => {
                console.log(error);
            })
        }
    },
    components: {
    }

}
</script>
  
<style>
.borderWhado {
    /* background-color: blue; */
    box-shadow: 8px 11px 41px 61px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}
</style>