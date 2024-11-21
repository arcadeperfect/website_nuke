"""
MIT License - see https://opensource.org/licenses/MIT
Copyright (c) [2024] [alex harding] alexharding.ooo
Permission is granted to use, copy, modify, and distribute this software and its documentation, provided that all copies include the copyright notice and this permission notice.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

Temporal Stabilizer Classic v0.1
Analyzes a camera's velocity and generates two timewarp nodes.
The first removes variation in velocity.
The second reapplies it.
They can be applied to both the camera and it's associated footage if it was tracked.
"""

import os


def scan(p):
    """
    Recursively scans a directory for image sequences and still images.

    Args:
        p (str): The path to the directory to scan.

    Returns:
        tuple: A tuple containing two lists:
            - sequences (list): A list of file paths that are part of image sequences.
            - still_images (list): A list of file paths that are still images.
    """
    image_formats = ["jpeg", "jpg", "tiff", "exr", "dpx"]
    sequences = []
    still_images = []

    if os.path.isdir(p):
        # find file sequences
        if nuke.getFileNameList(p):
            seqs = nuke.getFileNameList(p)
            # filter out directories
            seqs = [
                os.path.join(p, seq)
                for seq in seqs
                if not os.path.isdir(os.path.join(p, seq))
            ]
            if seqs:
                # get still images
                stim = [
                    seq
                    for seq in seqs
                    if os.path.splitext(seq)[-1][1:] in image_formats
                ]
                if stim:
                    still_images.extend(stim)

                # filter out non sequences
                seqs = [
                    seq
                    for seq in seqs
                    if (
                        " " in seq
                        and os.path.splitext(seq.split(" ")[0])[-1][1:] in image_formats
                    )
                ]
                if seqs:
                    sequences.extend(seqs)

    for i in os.listdir(p):
        np = p + i + "/"
        if not os.path.isdir(np):
            continue
        new_scan = scan(np)
        sequences.extend(new_scan[0])
        still_images.extend(new_scan[1])
    return sequences, still_images


def recLoad():
    """
    Prompts the user to choose a folder and loads sequences of files into Nuke.

    This function performs the following steps:
    1. Prompts the user to select a folder using Nuke's getClipname dialog.
    2. Scans the selected folder for sequences of files.
    3. For each sequence found, creates a Nuke Read node with the appropriate file path and frame range.
    4. For each individual file found, creates a Nuke Read node with the file path.

    Note:
        - The function assumes that the scan function is defined elsewhere and returns a tuple of two lists:
          the first list contains sequences with frame ranges, and the second list contains individual files.
        - The Nuke Read node is used to read image sequences or individual image files into Nuke.

    Returns:
        None
    """
    path = nuke.getClipname("Choose Folder", multiple=False)
    allSequences = scan(path)

    for i in allSequences[0]:
        n = nuke.nodes.Read(
            file=i.split(" ")[0],
            first=i.split(" ")[-1].split("-")[0],
            last=i.split(" ")[-1].split("-")[-1],
        )

    for i in allSequences[1]:
        n = nuke.nodes.Read(file=i)
