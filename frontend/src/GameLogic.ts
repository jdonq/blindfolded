import { type } from "os";

export type Vector2 = {
    x: number;
    y: number;
}

export type ScoreBoardEntry = {
    score: number;
    name: string;
}

export interface GameProps {

}

export interface InfoProps {
    vals: string[];
}

export type GameState = {
    xpos: number;
    ypos: number;
    fields: Array<string>;
    targetField: Vector2;
    isDataLoaded: boolean;
    infoText: string;
    ammo: number;
    score: number;
    disableButton: boolean;
}

export type ScoreboardState = {
    items: ScoreBoardEntry[];
    isDataLoaded: boolean;
}

export function getDistance(from: Vector2, to: Vector2): number {
    return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
}