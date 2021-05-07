<template>
    <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Company API</h3>
        </div>

        <ul class="list-unstyled components">
            <p>Dashboard</p>
            <li>
                <router-link to="/dashboard">Dashboard Home</router-link>
            </li>
            <li>
                <a href="#homeSubmenu" data-bs-toggle="collapse" aria-expanded="false">Company</a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                    <li><router-link to="/companies">View all</router-link></li>
                    <li><router-link to="/companies/add">Add Company</router-link></li>
                    <li><router-link to="/companies/find-by-isin">Find by ISIN</router-link></li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
                <a href="#pageSubmenu" data-bs-toggle="collapse" aria-expanded="false">Pages</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li><a href="#">Page 1</a></li>
                    <li><a href="#">Page 2</a></li>
                    <li><a href="#">Page 3</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>
</template>
