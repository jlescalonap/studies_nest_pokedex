import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
// Debe extender Document para injectar las funcionalidades de MongoDb,
// Y Definimos Schema() para el app entender que esto sera un schema de MondoDb.
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
