
<template>
    <div class="row justify-content-center">
    <div class="col-12 col-md-5 col-xl-4 my-5">
        <div class="text-center">
        <!-- Preheading -->
        <h6 class="text-uppercase text-muted mb-4">
            404 error
        </h6>
        <!-- Heading -->
        <h1 class="display-4 mb-3">
            Página no encontrada 😭
        </h1>
        <!-- Subheading -->
        <p class="text-muted mb-4">
            Parece que terminaste aquí por accidente? 
        </p>
        <!-- Button -->
        <router-link to="/colaborador/index" class="btn btn-lg btn-primary text-white">Regresar al dashboard</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Error404',
}
</script>
