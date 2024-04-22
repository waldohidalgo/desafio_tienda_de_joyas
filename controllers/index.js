import {
  HATEOAS,
  filtrarData,
  orderData,
  paginationData,
} from "../queries/consultas.js";
import { joyas } from "../data/data.js";

export function renderJoyasHATEOAS(req, res) {
  const { order, page, ...queryParams } = req.query;
  try {
    if (Object.keys(req.query).length == 0) {
      res.json(HATEOAS(joyas));
    } else {
      const joyasOrdenadas = orderData(joyas, order);
      const joyasPaginadas = paginationData(joyasOrdenadas, page);
      const joyasFiltradas = filtrarData(joyasPaginadas, queryParams);

      if (joyasFiltradas.length == 0) {
        res.json({
          error: "404 Not Found",
          message: "No hay joyas que coincidan con los parámetros de búsqueda",
        });
        return;
      }
      res.json(HATEOAS(joyasFiltradas, page));
    }
  } catch (error) {
    res.json(error);
  }
}

export function getCategorias(req, res) {
  try {
    const { categoria } = req.params;
    const categoriaFiltrada = joyas.filter(
      (joya) => joya.category === categoria,
    );
    res.json({ results: categoriaFiltrada });
  } catch (error) {
    res.send("Error", error);
  }
}

export function getJoyabyId(req, res) {
  try {
    const { id } = req.params;

    const joya = joyas.find((joya) => joya.id === +id);
    if (Object.keys(joya) !== 0) {
      res.json({ results: joya });
    } else {
      throw new Error(
        "No hay joyas que coincidan con los parámetros de búsqueda",
      );
    }
  } catch (error) {
    res.json({
      error: "404 Not Found",
      message: "No hay joyas que coincidan con los parámetros de búsqueda",
    });
  }
}
