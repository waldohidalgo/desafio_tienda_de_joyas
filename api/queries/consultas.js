export const HATEOAS = (joyas, page) => {
  const objetoHATEOASsinPage = {
    count: joyas.length,
    asc: "/joyas?order=asc",
    desc: "/joyas?order=desc",
    filter: "/joyas?model=Heart&metal=oro",
    pagination: "/joyas?page=1",
    results: joyas.map((joya) => {
      return {
        ...joya,
        links: [
          {
            rel: "self",
            href: `/joyas/id/${joya.id}`,
            method: "GET",
          },
          {
            rel: "categoria",
            href: `/joyas/categoria/${joya.category}`,
            method: "GET",
          },
          {},
        ],
      };
    }),
  };
  if (page) {
    return { page: page, ...objetoHATEOASsinPage };
  }
  return objetoHATEOASsinPage;
};

export function filtrarData(joyas, objetoCampos) {
  if (Object.keys(objetoCampos).length == 0) {
    return joyas;
  }
  const joyasFiltradas = joyas.filter((joya) => {
    for (let key in objetoCampos) {
      if (joya[key] != objetoCampos[key]) {
        return false;
      }
    }
    return true;
  });
  return joyasFiltradas;
}

export function orderData(joyas, order) {
  const newJoyas = [...joyas];
  if (order == "asc") {
    return newJoyas.sort((a, b) => +a.value - +b.value);
  }
  if (order == "desc") {
    return newJoyas.sort((a, b) => +b.value - +a.value);
  }
  return newJoyas;
}

export function paginationData(joyas, page) {
  // cantidad maxima de elementos por pagina 5

  const cantidadMaximadeElementosPorPagina = 2;
  const inicio = (page - 1) * cantidadMaximadeElementosPorPagina;
  const final = page * cantidadMaximadeElementosPorPagina;
  if (isNaN(inicio) || isNaN(final)) {
    return joyas;
  }
  return joyas.slice(
    cantidadMaximadeElementosPorPagina * (page - 1),
    cantidadMaximadeElementosPorPagina * page,
  );
}
