import * as borsh from "@project-serum/borsh"; // Borsh is a binary object representation designed for blockchain development. It's used to convert JavaScript objects to a binary format that can be stored or transmitted more efficiently.

export class Movie {
  title: string;
  rating: number;
  description: string;

  // In order to properly interact with a Solana Program, we need to know how it expects its data inputs to be structured, hence the need for a schema.
  borshInstructionSchema = borsh.struct([
    borsh.u8("variant"), // indicates which instruction to be executed e.g. 0 = addMovie(), 1 = deleteMovie()
    borsh.str("title"),
    borsh.u8("rating"),
    borsh.str("description"),
  ]);

  constructor(title: string, rating: number, description: string) {
    this.title = title;
    this.rating = rating;
    this.description = description;
  }

  // In Node.js, a Buffer is a class that is used to handle binary data.
  // Buffers are created to hold data that is being transferred between different parts of an application, and between applications.
  serialize(): Buffer {
    const buffer = Buffer.alloc(1000); // creates a large enough buffer to hold the serialized data (1000 bytes)
    this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer); // "...this" is a spread operator that copies all the properties of the Movie class into a new object, and then we add the variant property to it. we encode the data into the buffer to
    return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer)); // getSpan() gets the length or span of the encoded data in the buffer
  }

  static mocks: Movie[] = [
    new Movie(
      "The Shawshank Redemption",
      5,
      `For a movie shot entirely in prison where there is no hope at all, shawshank redemption's main massage and purpose is to remind us of hope, that even in the darkest places hope exists, and only needs someone to find it. Combine this message with a brilliant screenplay, lovely characters and Martin freeman, and you get a movie that can teach you a lesson everytime you watch it. An all time Classic!!!`
    ),
    new Movie(
      "The Godfather",
      5,
      `One of Hollywood's greatest critical and commercial successes, The Godfather gets everything right; not only did the movie transcend expectations, it established new benchmarks for American cinema.`
    ),
    new Movie(
      "The Godfather: Part II",
      4,
      `The Godfather: Part II is a continuation of the saga of the late Italian-American crime boss, Francis Ford Coppola, and his son, Vito Corleone. The story follows the continuing saga of the Corleone family as they attempt to successfully start a new life for themselves after years of crime and corruption.`
    ),
    new Movie(
      "The Dark Knight",
      5,
      `The Dark Knight is a 2008 superhero film directed, produced, and co-written by Christopher Nolan. Batman, in his darkest hour, faces his greatest challenge yet: he must become the symbol of the opposite of the Batmanian order, the League of Shadows.`
    ),
  ];
}
