import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    //? Method #2
    // const insertPromisesArray = [];

    //? Method #3
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      //? Method #1
      // const pokemon = await this.pokemonModel.create({ no, name });

      //? Method #2
      // insertPromisesArray.push(this.pokemonModel.create({ no, name }));

      //? Method #3
      pokemonToInsert.push({ no, name });
    });

    //? Part of method #2 - async was removed from the forEach
    // await Promise.all(insertPromisesArray);

    //? Method #3
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed!';
  }
}
