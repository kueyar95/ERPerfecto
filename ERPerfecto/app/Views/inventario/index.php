<div class="col-8 ms-5">
    <nav class="row justify-content-between">
        <div class="col-1">
            <button>Hamburguesa</button>
        </div>
        <div class="col-1">
            <button>Mi perfil</button>
        </div>
    </nav>
    <?php
    //echo "<pre>";
    //var_dump($inventary);
    //echo "</pre>";
    ?>
    <section>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#inventory" type="button" role="tab" aria-controls="home" aria-selected="true">Inventario</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="profile" aria-selected="false">Productos</button>
            </li>
            <!--<li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
                </li>-->
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="inventory" role="tabpanel" aria-labelledby="home-tab">
                <h1>Inventario</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"># producto</th>
                            <th scope="col">Nombre producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        ?>
                        <?php foreach ($inventary as $inv) : ?>
                            <tr>
                                <td scope="row"><?= $inv["idProduct"]; ?></td>
                                <td><?= $inv["productName"]; ?></td>
                                <td><?= $inv["productStock"]; ?></td>
                                <td><?= $inv["productPrice"]; ?></td>
                                <td>
                                    <a href="<?php echo route_to('eliminarProducto', $inv['idProduct']) ?>">Eliminar</a>
                                    <a href="<?php echo route_to('modificarProducto', $inv['idProduct']) ?>">Modificar</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAddInventory">
                    Añadir inventario
                </button>

                <!-- Modal -->
                <div class="modal fade" id="modalAddInventory" tabindex="-1" aria-labelledby="modalAddInventoryLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalAddInventoryLabel">Añadir Inventario</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form method="POST" action="<?php echo route_to('addProduct') ?>" id="formAddProduct">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1">
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="products" role="tabpanel" aria-labelledby="profile-tab">
                <h1>Productos</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"># producto</th>
                            <th scope="col">Nombre producto</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        ?>
                        <?php foreach ($inventary as $inv) : ?>
                            <tr>
                                <td scope="row"><?= $inv["idProduct"]; ?></td>
                                <td><?= $inv["productName"]; ?></td>
                                <td><?= $inv["categoryName"]; ?></td>
                                <td><?= $inv["productDescription"]; ?></td>
                                <td><?= $inv["productPrice"]; ?></td>

                                <td>
                                    <a href="<?php echo route_to('eliminarProducto', $inv['idProduct']) ?>">Eliminar</a>
                                    <a href="<?php echo route_to('modificarProducto', $inv['idProduct']) ?>">Modificar</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAddProduct">
                    Añadir productos
                </button>

                <!-- Modal -->
                <div class="modal fade" id="modalAddProduct" tabindex="-1" aria-labelledby="modalAddProductLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalAddProductLabel">Añadir Producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form method="POST" action="<?php echo route_to('addProduct') ?>" id="formAddProduct">
                                    <div class="mb-3">
                                        <label for="InputNameProduct" class="form-label">Nombre del Producto</label>
                                        <input type="text" class="form-control" id="InputNameProduct" aria-describedby="nameProduct">
                                        <div id="nameProduct" class="form-text">Nombre inválido</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="InputSKUProduct" class="form-label">SKU</label>
                                        <input type="text" class="form-control" id="InputSKUProduct" aria-describedby="SKUProduct">
                                        <div id="SKUProduct" class="form-text">SKU inválido</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="InputCatProduct" class="form-label">Categoría</label>
                                        <input type="text" class="form-control" id="InputCatProduct" aria-describedby="CatProduct">
                                        <div id="CatProduct" class="form-text">Categoría inválida</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="InputDescripProduct" class="form-label">Descripción</label>
                                        <input type="text" class="form-control" id="InputDescripProduct" aria-describedby="DescripProduct">
                                        <div id="DescripProduct" class="form-text">Descripción inválida</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="InputPrecioProduct" class="form-label">Precio</label>
                                        <input type="number" class="form-control" id="InputPrecioProduct" aria-describedby="PrecioProduct">
                                        <div id="PrecioProduct" class="form-text">Precio inválido</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="InputCantProduct" class="form-label">Cantidad a ingresar</label>
                                        <input type="number" class="form-control" id="InputCantProduct" aria-describedby="CantProduct">
                                        <div id="CantProduct" class="form-text">Cantidad inválido</div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                    
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>-->
        </div>

    </section>
    <?php ?>
</div>