<style>

body{
    height: 600px;
}

.container{
    margin: auto;
    margin-top: 30px;
    width: 95%;
}

.table_appartement {
    width: 100%;
    height: 100px;
}

.table_service {
    width: 100%;
    height: 400px;
}
table {
    width: 100%;
    height: 100px;
}

table, tr, th, td {

    border: solid;
    border-width: 1px;
    border-collapse: collapse;
}

.info_client{
    margin-bottom: 30px;
}

.liste_service{
    height: 100%;
}

</style>
<div class="container">
    <div class="info_client">
        @php 
            echo  "<strong>".$user->name."</strong> <br>"
        @endphp
        address <br>
        Ville <br>
    </div>

    <table class="table_appartement">
        <thead>
        <tr>
            <th style="width:80%">Appartement</th>
            <th>Prix</th>
        </tr>
        </thead>
        <tbody>
            <tr class="appartement">
                @php
                    echo "<td>".$reservation->apartment->name."</td>";
                    echo "<td>".$total_price."€</td>"
                @endphp

                
            </tr>
    </table>

    <table class="table_service">
        <thead>
        <tr>
            <th style="width:80%">Service</th>
            <th>Prix</th>
        </tr>
        </thead>
        <tbody>
            <tr class="liste_service">
                <td>Service 1</td>
                <td>Prix 1</td>
            </tr>
            <tr class="liste_service">
                <td>Service 2</td>
                <td>Prix 2</td>
            </tr>
        </tbody>

    </table>
</div>
