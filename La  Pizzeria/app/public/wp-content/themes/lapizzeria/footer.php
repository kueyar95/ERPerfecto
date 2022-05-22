<footer class="site-footer">
    <?php
        $args = array(
            'theme_location' => 'header_menu',
            'container' => 'nav',
            'container_class' => 'footer-nav',
            'after' => '<span class="separador"> | </span>'
        );
        wp_nav_menu($args);

    ?>
    <div class="direccion">
        <p>Coronel Souper 4060, Estación Central</p>
        <p>Teléfono: +59632109370</p>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>