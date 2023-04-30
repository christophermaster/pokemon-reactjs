import React, { useState, useEffect } from "react";
import { getPokemons, downloadPokemonPdf } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';



const PokemonListPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1280);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchPokemons = async () => {
      const data = await getPokemons(page, limit, search);
      if (data) {
        setPokemons(data);
        setIsLoading(false);
      }
    };
    fetchPokemons();

  }, [page, limit, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event) => {
    setPage(parseInt(event.target.value));
  };

  const handlePrevPageClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPageClick = () => {

    if (pokemons.length !== 0) {
      setPage(page + 1);
    }
  };

  const handledownload = (name) => {
    downloadPokemonPdf(name);
  };

  return (

    <Container>
      <Row className="justify-content-center align-items-center my-4">
        <Col md={12} className="text-center"> <h1 id ="main" style={{  fontFamily: "Bangers" , fontSize: '80px'}}>Lista  de Pokemones</h1>  </Col>
      </Row>

      <Row className="justify-content-center align-items-center">
        <Col md={4} className="text-center">
          <Form.Label htmlFor="Buscar">Buscar</Form.Label>
          <Form.Control
            type="Buscar"
            id="search"
            aria-describedby="BuscarHelpBlock"
            value={search} onChange={handleSearchChange}
          />
          <Form.Text id="BuscarHelpBlock" muted>
            Buscar pokemon por nombre.
          </Form.Text>
        </Col>
        <Col md={4} className="text-center">
          <Form.Label htmlFor="inputCantidad">Cantidad</Form.Label>
          <Form.Select value={limit} onChange={handleLimitChange} id="limit">
            <option value="1280" >Seleccione la cantidad</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1280</option>
          </Form.Select>
          <Form.Text id="passwordHelpBlock" muted>
            Cantidad de pokemon a mostrar.
          </Form.Text>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md={12} className="text-center">

          <Button variant="warning" onClick={handlePrevPageClick} > {'<<'} </Button>
          <label style={{ marginRight: '10px', marginLeft: '10px' }}>{page}</label>
          <Button variant="warning" onClick={handleNextPageClick}> {'>>'} </Button>

        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (!pokemons.length ? (
        <p>Ya no se encuentran pokemones...</p>
      ) : (
        <>
          {pokemons.map((pokemon) => (
            <Col lg xl xxl={3} sm xs md = {6}  key={pokemon.name} className="my-2">
              <Card style={{ width: "15rem" }}>
                <Card.Img
                  variant="top"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/").filter(Boolean).pop()}.png`}
                />
                <Card.Body>
                  <Card.Title>{pokemon.name}</Card.Title>
                  <Card.Text></Card.Text>
                  <Button variant="primary" onClick={() =>handledownload(pokemon.name)}>
                  {isLoading ? '':'Descargar'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </>
      ))}
    </Row>

    </Container>

  );
};

export default PokemonListPage;