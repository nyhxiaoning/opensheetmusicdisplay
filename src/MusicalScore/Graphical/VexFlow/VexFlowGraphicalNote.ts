import Vex = require("vexflow");
import {GraphicalNote} from "../GraphicalNote";
import {Note} from "../../VoiceData/Note";
import {GraphicalStaffEntry} from "../GraphicalStaffEntry";
import {ClefInstruction} from "../../VoiceData/Instructions/ClefInstruction";
import {VexFlowConverter} from "./VexFlowConverter";
import {Pitch} from "../../../Common/DataObjects/pitch";

export class VexFlowGraphicalNote extends GraphicalNote {
    constructor(note: Note, parent: GraphicalStaffEntry, activeClef: ClefInstruction) {
        super(note, parent);
        this.clef = activeClef;
        if (note.Pitch) {
            this.vfpitch = VexFlowConverter.pitch(note.Pitch, this.clef);
            this.vfpitch[1] = undefined;
        }
    }

    public vfpitch: [string, string, ClefInstruction];
    private vfnote: [Vex.Flow.StaveNote, number];
    private clef: ClefInstruction;

    public setPitch(pitch: Pitch): void {
        if (this.vfnote) {
            let acc: string = VexFlowConverter.accidental(pitch.Accidental);
            if (acc) {
                alert(acc);
                this.vfnote[0].addAccidental(this.vfnote[1], new Vex.Flow.Accidental(acc));
            }
        } else {
            this.vfpitch = VexFlowConverter.pitch(pitch, this.clef);
        }
    }

    /**
     * Set the corresponding VexFlow StaveNote together with its index
     * @param note
     * @param index
     */
    public setIndex(note: Vex.Flow.StaveNote, index: number): void {
        this.vfnote = [note, index];
        //if (this.vfpitch && this.vfpitch[1]) {
        //    note.addAccidental(index, new Vex.Flow.Accidental(this.vfpitch[1]));
        //}
    }
}
