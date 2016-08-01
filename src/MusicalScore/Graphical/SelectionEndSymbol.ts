﻿import {GraphicalObject} from "./GraphicalObject";
import {MusicSystem} from "./MusicSystem";
import {OutlineAndFillStyleEnum} from "./DrawingEnums";
import {StaffLine} from "./StaffLine";
import {PointF2D} from "../../Common/DataObjects/PointF2D";
import {BoundingBox} from "./BoundingBox";
import {GraphicalLine} from "./GraphicalLine";
import {CollectionUtil} from "../../Util/collectionUtil";

export class SelectionEndSymbol extends GraphicalObject {
    constructor(system: MusicSystem, xPosition: number) {
        super();
        let xCoordinate: number = xPosition;
        let yCoordinate: number = system.PositionAndShape.AbsolutePosition.y;
        let lineThickness: number = 0.4;
        let height: number = CollectionUtil.last(system.StaffLines).PositionAndShape.RelativePosition.y + 4;
        this.verticalLine = new GraphicalLine(
            new PointF2D(xCoordinate, yCoordinate),
            new PointF2D(xCoordinate, yCoordinate + height),
            lineThickness,
            OutlineAndFillStyleEnum.SelectionSymbol
        );
        for (let idx: number = 0, len: number = system.StaffLines.length; idx < len; ++idx) {
            let staffLine: StaffLine = system.StaffLines[idx];
            let anchor: PointF2D = new PointF2D(xCoordinate, yCoordinate + staffLine.PositionAndShape.RelativePosition.y);
            let arrowPoints: PointF2D[] = new Array(3);
            anchor.y -= .2;
            arrowPoints[0].x = anchor.x - 3;
            arrowPoints[0].y = anchor.y + 1.2;
            arrowPoints[1].x = anchor.x - 2;
            arrowPoints[1].y = anchor.y + 0.4;
            arrowPoints[2].x = anchor.x - 2;
            arrowPoints[2].y = anchor.y + 2;
            this.arrows.push(arrowPoints);
            let linePoints: PointF2D[] = new Array(8);
            let arrowThickness: number = .8;
            anchor.x -= .1;
            anchor.y += .3;
            let hilfsVar: number = .2;
            linePoints[0].x = anchor.x - 2;
            linePoints[0].y = anchor.y + 1.5 - hilfsVar;
            linePoints[1].x = anchor.x - 1;
            linePoints[1].y = anchor.y + 1.5 - hilfsVar;
            linePoints[2].x = anchor.x - 1;
            linePoints[2].y = anchor.y + 2.5;
            linePoints[3].x = anchor.x - 2;
            linePoints[3].y = anchor.y + 2.5;
            linePoints[4].x = linePoints[0].x;
            linePoints[4].y = linePoints[0].y - arrowThickness;
            linePoints[5].x = linePoints[4].x + arrowThickness + 1;
            linePoints[5].y = linePoints[4].y;
            linePoints[6].x = linePoints[5].x;
            linePoints[6].y = linePoints[3].y + arrowThickness;
            linePoints[7].x = linePoints[3].x;
            linePoints[7].y = linePoints[6].y;
            this.arrowlines.push(linePoints);
        }
        this.boundingBox = new BoundingBox(this);
        this.boundingBox.AbsolutePosition = new PointF2D(xCoordinate, yCoordinate);
        this.boundingBox.BorderLeft = -lineThickness;
        this.boundingBox.BorderRight = 4;
        this.boundingBox.BorderBottom = height;
    }

    public verticalLine: GraphicalLine;
    public arrows: PointF2D[][];
    public arrowlines: PointF2D[][];
}
