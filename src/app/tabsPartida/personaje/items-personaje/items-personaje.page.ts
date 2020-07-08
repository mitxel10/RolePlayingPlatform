import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items-service/items.service';
import { GrupoItem } from 'src/app/models/grupoItem';
import { Item } from 'src/app/models/item';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario-service/inventario.service';
import { Inventario } from 'src/app/models/inventario';

@Component({
  selector: 'app-items-personaje',
  templateUrl: './items-personaje.page.html',
  styleUrls: ['./items-personaje.page.scss'],
})
export class ItemsPersonajePage implements OnInit {

  private idPartida: string;
  private idPersonaje: string;
  public itemGroupsPartida: GrupoItem[];

  constructor(private itemsService: ItemsService, private inventarioService: InventarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.idPartida = JSON.parse(localStorage.getItem('idPartida'));
    this.idPersonaje = this.route.snapshot.paramMap.get('idPersonaje');
    this.itemGroupsPartida = [];
    this.cargarItemsPartida();
  }

  cargarItemsPartida() {
    this.itemsService.obtenerItemGroupsPartida(this.idPartida).subscribe((resultadoConsulta) => {
      resultadoConsulta.forEach(grupoItem => {
        let grupo = grupoItem.data() as GrupoItem;
        let idGrupo = grupoItem.id;
        this.obtenerItemsPartida(idGrupo, grupo);
      });
    });
  }

  obtenerItemsPartida(idGrupo: string, grupo: GrupoItem) {
    grupo.items = [];
    this.itemsService.obtenerItemsPartida(idGrupo).subscribe((resultadoConsulta) => {
      resultadoConsulta.forEach(itemData => {
        let item = itemData.data() as Item;
        let idItem = itemData.id;
        item.id = idItem;

        this.buscarInventarioPersonaje(item);

        grupo.items.push(item);
      });
      this.itemGroupsPartida.push(grupo);
    });
  }
  buscarInventarioPersonaje(item: Item) {
    this.inventarioService.obtenerInventarioPersonaje(item.id, this.idPersonaje).subscribe((inventarios) => {
        if(!inventarios.empty) {
          const inventarioData = inventarios.docs[0];
          let inventario = inventarioData.data() as Inventario;
          item.cantidadPersonaje = inventario.cantidad;
        } else {
          item.cantidadPersonaje = 0;
        }
    });
  }

  actualizacionInventario($event, item: Item) {    
    if($event != null) {
      this.inventarioService.actualizarInventarioPersonaje(item.id, this.idPersonaje, $event);
    }
  }
}
